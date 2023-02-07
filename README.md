

# Sanity
## Configuration
```
Edit sanity.config.ts, sanity.cli.ts:
   - projectId: 'projectId'  - change to your project id,
   - dataset: 'projectDataset' - change to your project dataset,
```
## Setup
```
 yarn dev
```

# Nuxt
## Configuration
```
Edit:
 - nuxt.config.ts
  + projectId: "projectId" - change to your sanity project id,
  + apiVersion: 'projectApiVersion' - change to your sanity version of the api,
  + dataset:'projectDataset', - change to your sanity project dataset,
 - utils/login.ts
  + ('magicPublicKey') - change to your magic public key        
```
```
Environment variables:
- WRITE_TOKEN - sanity write token,
- MAGIC_SECRET_KEY - magic private key
```
```
To use the Magic link site with an actual address to sign in, edit:
 - server/middleware/userCheck.ts
 - utils/login.ts
 and follow through with the comments in the files
```


## Setup
```
 yarn dev
```
## Demo

[Demo](https://store-bien-t.vercel.app/)
```
Email address to sign in:
 - test+success@magic.link
```
