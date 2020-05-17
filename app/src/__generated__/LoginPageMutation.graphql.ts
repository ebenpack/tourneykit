/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type LoginPageMutationVariables = {
    username: string;
    password: string;
};
export type LoginPageMutationResponse = {
    readonly login: {
        readonly ok: boolean | null;
        readonly user: {
            readonly username: string;
            readonly id: string;
        } | null;
    } | null;
};
export type LoginPageMutation = {
    readonly response: LoginPageMutationResponse;
    readonly variables: LoginPageMutationVariables;
};



/*
mutation LoginPageMutation(
  $username: String!
  $password: String!
) {
  login(username: $username, password: $password) {
    ok
    user {
      username
      id
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "username",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "password",
                    "variableName": "password"
                },
                {
                    "kind": "Variable",
                    "name": "username",
                    "variableName": "username"
                }
            ],
            "concreteType": "Login",
            "kind": "LinkedField",
            "name": "login",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ok",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserType",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "username",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "id",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "LoginPageMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutations"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "LoginPageMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "LoginPageMutation",
            "operationKind": "mutation",
            "text": "mutation LoginPageMutation(\n  $username: String!\n  $password: String!\n) {\n  login(username: $username, password: $password) {\n    ok\n    user {\n      username\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '3a5e64e99223f375ee1d0a8107da0660';
export default node;
