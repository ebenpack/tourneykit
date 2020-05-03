import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { FetchFunction } from "relay-runtime/lib/network/RelayNetworkTypes";
import * as Cookies from "js-cookie";

const fetchQuery: FetchFunction = (operation, variables) =>
    fetch("/graphql/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then((response) => {
        return response.json();
    });

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
