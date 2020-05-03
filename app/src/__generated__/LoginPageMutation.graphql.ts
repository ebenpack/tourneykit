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
            "kind": "Variable",
            "name": "password",
            "variableName": "password"
        } as any),
        ({
            "kind": "Variable",
            "name": "username",
            "variableName": "username"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "LoginPageMutation",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Login",
                    "kind": "LinkedField",
                    "name": "login",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserType",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                                (v3 /*: any*/)
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "type": "Mutations"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "LoginPageMutation",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Login",
                    "kind": "LinkedField",
                    "name": "login",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserType",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                                (v3 /*: any*/),
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
                }
            ]
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
(node as any).hash = '80be3f9ffdcc04d87bbdecf80b8ac0d6';
export default node;
