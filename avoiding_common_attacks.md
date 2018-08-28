# Avoiding common attacks

1. Implemented SafeMath library to avoid Arithmetic Overflow and Underflow
2. Escrow contract can only be called by EcommerceStore contract
3. Re entring to withdraw fund is not possible because of releaseAmount and refundAmount mapping set to true first thing if the function is called
4. Only order participant (buyer & seller) can interact with the escrow contract via the EcommerceStore contract
5. A bunch of modifiers is set to perform every role and interaction verification before function execution


