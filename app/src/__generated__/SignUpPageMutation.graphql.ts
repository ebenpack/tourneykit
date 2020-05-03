/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SignUpPageMutationVariables = {
    username: string;
    email: string;
    password: string;
    passwordVerify: string;
};
export type SignUpPageMutationResponse = {
    readonly signUp: {
        readonly ok: boolean | null;
        readonly user: {
            readonly username: string;
        } | null;
    } | null;
};
export type SignUpPageMutation = {
    readonly response: SignUpPageMutationResponse;
    readonly variables: SignUpPageMutationVariables;
};



/*
mutation SignUpPageMutation(
  $username: String!
  $email: String!
  $password: String!
  $passwordVerify: String!
) {
  signUp(username: $username, email: $email, password: $password, passwordVerify: $passwordVerify) {
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
            "name": "email",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "passwordVerify",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "email",
            "variableName": "email"
        } as any),
        ({
            "kind": "Variable",
            "name": "password",
            "variableName": "password"
        } as any),
        ({
            "kind": "Variable",
            "name": "passwordVerify",
            "variableName": "passwordVerify"
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
            "name": "SignUpPageMutation",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "SignUp",
                    "kind": "LinkedField",
                    "name": "signUp",
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
            "name": "SignUpPageMutation",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "SignUp",
                    "kind": "LinkedField",
                    "name": "signUp",
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
            "name": "SignUpPageMutation",
            "operationKind": "mutation",
            "text": "mutation SignUpPageMutation(\n  $username: String!\n  $email: String!\n  $password: String!\n  $passwordVerify: String!\n) {\n  signUp(username: $username, email: $email, password: $password, passwordVerify: $passwordVerify) {\n    ok\n    user {\n      username\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '77e42342ffb604cda2e783ad1b714a68';
export default node;
