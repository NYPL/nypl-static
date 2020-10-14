# nypl-static

This repo hosts files that are deployed to the `nypl-static` and `nypl-static-qa` S3 buckets and intended to be used for global JavaScript and static resources.

Most NYPL web properties (e.g. WWW, Encore, Shared Collection Catalog, other React Applications) load the `js/advocacy.js` file on page load.

## S3 Buckets

These are the corresponding buckets for each environment:

| Environment | S3 Bucket Name            |
|-------------|---------------------------|
| development | `nypl-static-development` |
| qa          | `nypl-static-qa`          |
| production  | `nypl-static`             |

## Workflow

1. Create a feature branch from `development`.
2. Update javascript files in `source/` directory. This will get minified and copied over to the `/base` directory which is the main directory that will be deployed to the appropriate s3 bucket.
3. If creating a new file and minimization is desired for file, update `prepare.js` accordingly.
4. Merge feature branch to `development` after proper code review.
6. Merge `development` into `qa` and then `qa` into `master`.
5. Files will be minified, prepared, and deployed via Travis.

## Deployment

*Note*: The s3 buckets previously supported a `/js` directory which is kept to support existing apps that use it. For newer releases after 10/20, use the `/base/js` directory.

All folders in the `/base` directory will be deployed to the appropriate s3 bucket.
The minified and prepared `/base/js/` directory is automatically deployed via Travis upon commit to the appropriate branch:

| Branch      | Account            | S3 Bucket Name            | Sample Link                                                                                               |
|-------------|--------------------|---------------------------|-----------------------------------------------------------------------------------------------------------|
| development | `nypl-sandbox`     | `nypl-static-development` | [S3](https://s3.amazonaws.com/nypl-static-development/js/advocacy.js)                                     |
| qa          | `nypl-digital-dev` | `nypl-static-qa`          | [S3](https://s3.amazonaws.com/nypl-static-qa/js/advocacy.js)                                              |
| master      | `nypl-digital-dev` | `nypl-static`             | [S3](https://s3.amazonaws.com/nypl-static/js/advocacy.js) - [CDN](https://assets.nypl.org/js/advocacy.js) |
