# token-math

Package to do ERC-20 arithmetic.

---

This package uses two classes to describe a token and a number of token. A `Token` takes in an `address`, `symbol`, and number of `decimals`. A `Quantity` allows arithmitic to be done on it.
To create a Quantity from a token `const quantity = token.createQuanity(1, true)` to create `1.00` of the token.
