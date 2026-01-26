{
  "recommendations": [
    {
      "type": "files",
      "files": [
        "**/*.js",
        "**/*.jsx"
      ],
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"
      }
    }
  ],
  "linterOptions": {
    "exclude": ["node_modules", "dist"]
  }
}
