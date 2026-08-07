const GRAPHQL_ENDPOINT = "https://wiggle.shop/graphql";

export async function fetchGraphQL(query: string, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: 'force-cache',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data, errors } = await response.json();

        if (errors) {
            console.error("GraphQL Errors:", errors);
            throw new Error("Error fetching data from GraphQL");
        }

        return data;
    } catch (error) {
        console.error("fetchGraphQL Error:", error);
        throw error;
    }
}
