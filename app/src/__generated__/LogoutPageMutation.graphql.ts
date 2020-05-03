/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type LogoutPageMutationVariables = {};
export type LogoutPageMutationResponse = {
    readonly logout: {
        readonly ok: boolean | null;
    } | null;
};
export type LogoutPageMutation = {
    readonly response: LogoutPageMutationResponse;
    readonly variables: LogoutPageMutationVariables;
};



/*
mutation LogoutPageMutation {
  logout {
    ok
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "alias": null,
            "args": null,
            "concreteType": "Logout",
            "kind": "LinkedField",
            "name": "logout",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ok",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "LogoutPageMutation",
            "selections": (v0 /*: any*/),
            "type": "Mutations"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "LogoutPageMutation",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "LogoutPageMutation",
            "operationKind": "mutation",
            "text": "mutation LogoutPageMutation {\n  logout {\n    ok\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'c5ea01346033beb952102bd1fc2ff149';
export default node;
