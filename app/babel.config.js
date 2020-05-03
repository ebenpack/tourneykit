const presets = [
    ["@babel/preset-react"],
    [
        "@babel/env",
        {
            targets: {
                browsers: [
                    "Chrome >= 70",
                    "Safari >= 11",
                    "iOS >= 11",
                    "Firefox >= 63",
                    "Edge >= 17",
                ],
            },
            useBuiltIns: "usage",
        },
    ],
];
const plugins = [
    "transform-es2015-modules-commonjs",
    ["relay", { artifactDirectory: "./src/__generated__" }],
];

module.exports = { presets, plugins };
