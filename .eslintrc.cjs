module.exports = {
	extends: ["verit"],
	rules: {
		eqeqeq: ["error", "always", { null: "never" }],
		"@typescript-eslint/no-var-requires": ["off"],
		"react/jsx-key": ["off"],
	},
	parserOptions: { project: "tsconfig.json" },
	settings: {
		react: {
			pragma: "React",
			version: "16.2",
		},
	},
};
