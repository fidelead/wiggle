import ProductClient from "./ProductClient";
import ProductCategoriesSection from "@/components/product/ProductCategoriesSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import { fetchGraphQL } from "@/lib/graphql";
import { notFound } from "next/navigation";

const GET_PRODUCT_BY_SLUG = `
query ObtenerProductoIndividual($id: ID!) {
  product(id: $id, idType: SLUG) {
    id
    databaseId
    name
    description
    shortDescription
    image {
      sourceUrl
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    productCategories {
      nodes {
        name
      }
    }
    productBrands {
      nodes {
        name
        slug
      }
    }
    ... on SimpleProduct {
      price
      sku
      stockStatus
      stockQuantity
    }
    ... on VariableProduct {
      price
      sku
      stockStatus
      stockQuantity
      variations {
        nodes {
          id
          name
          price
          sku
          stockStatus
          stockQuantity
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
    }
  }
}
`;

const GET_ALL_PRODUCT_SLUGS = `
query GetAllProductSlugs {
  products(first: 700) {
    nodes {
      slug
    }
  }
}
`;

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL(GET_ALL_PRODUCT_SLUGS);
    if (!data?.products?.nodes) return [{ slug: 'demo' }];
    return data.products.nodes.map((product: { slug: string }) => ({
      slug: product.slug,
    }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [{ slug: 'demo' }];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let productData;
  try {
    const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { id: slug });
    productData = data.product;
  } catch (err) {
    console.error("Error fetching product:", err);
    return <div className="p-24 text-center">Producto no encontrado (Error de conexión)</div>;
  }

  if (!productData) {
    return <div className="p-24 text-center">Producto no encontrado</div>;
  }

  // Adapt WooCommerce data to the frontend component expected structure
  const fallbackImages = [
    "/featured-harness.png",
    "/featured-collar.png",
    "/featured-raincoat.png",
    "/featured-sweater.png",
    "/accessories-product.png"
  ];

  const productImages = [
    productData.image?.sourceUrl,
    ...(productData.galleryImages?.nodes?.map((img: any) => img.sourceUrl) || [])
  ].filter(Boolean);

  // Offer Map for OWNAT discount products
  const OFFER_DETAILS_MAP: Record<string, { regularPrice: number; salePrice: number; discountPercentage: number; image: string }> = {
    "ownat-classic-duck-perro-4-kg": {
      regularPrice: 29.22,
      salePrice: 20.45,
      discountPercentage: 30,
      image: "/ownat-duck-4kg.png"
    },
    "ownat-classic-duck-perro-12-kg": {
      regularPrice: 82.29,
      salePrice: 57.60,
      discountPercentage: 30,
      image: "/ownat-duck-12kg.png"
    },
    "ownat-classic-complet-perro-12-kg": {
      regularPrice: 66.51,
      salePrice: 46.56,
      discountPercentage: 30,
      image: "/ownat-complet-12kg.png"
    }
  };

  const offerInfo = OFFER_DETAILS_MAP[slug];

  const adaptedProduct = {
    id: productData.id,
    slug,
    brand: productData.productBrands?.nodes?.[0]?.name || "OWNAT",
    category: productData.productCategories?.nodes?.[0]?.name || "Alimento",
    sku: productData.sku || `MP${productData.databaseId}`,
    name: productData.name,
    price: productData.price, // WooCommerce HTML price string
    regularPrice: offerInfo ? offerInfo.regularPrice : undefined,
    salePrice: offerInfo ? offerInfo.salePrice : undefined,
    discountPercentage: offerInfo ? offerInfo.discountPercentage : undefined,
    isOffer: !!offerInfo,
    description: productData.shortDescription || productData.description || "Nutrición de alta gama seleccionada con ingredientes de alta calidad para tu mascota.",
    stockStatus: productData.stockStatus,
    stockQuantity: productData.stockQuantity,
    images: offerInfo ? [offerInfo.image, ...productImages] : (productImages.length > 0 ? productImages : fallbackImages.slice(0, 4)),
    variants: productData.variations?.nodes?.map((v: any) => ({
      id: v.id,
      name: v.name,
      price: v.price,
      sku: v.sku,
      stockStatus: v.stockStatus,
      stockQuantity: v.stockQuantity,
      attributes: v.attributes?.nodes || []
    })) || []
  };

  return (
    <>
      <ProductClient product={adaptedProduct} />
      <ProductCategoriesSection />
      <RelatedProducts />
    </>
  );
}
