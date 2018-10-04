# nypl-static

This repo hosts files that are deployed to the `nypl-static` S3 bucket and intended to be used for global JavaScript and static resources.

Most NYPL web properties (e.g. WWW, Encore, Shared Collection Catalog, other React Applications) load the `js/advocacy.js` file on page load.

## S3 Buckets

These are the corresponding buckets for each environment:

| Environment | S3 Bucket Name            |
|-------------|---------------------------|
| development | `nypl-static-development` |
| qa          | `nypl-static-qa`          |
| production  | `nypl-static`             |

## Workflow

1. Create a feature branch from `master`.
2. Update files in `source/` directory.
3. If creating a new file and minimization is desired for file, update `prepare.js` accordingly.
4. Merge feature branch to `development` after proper code review.
5. Files will be deployed and minified and prepared via Travis.

## Deployment

The minified and prepared `js/` directory is automatically deployed via Travis upon commit to the appropriate branch:

| Branch      | Account            | S3 Bucket Name            |
|-------------|--------------------|---------------------------|
| development | `nypl-sandbox`     | `nypl-static-development` |
| qa          | `nypl-digital-dev` | `nypl-static-qa`          |
| master      | `nypl-digital-dev` | `nypl-static`             |
