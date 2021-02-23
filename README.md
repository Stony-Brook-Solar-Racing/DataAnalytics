# DataAnalytics Solar Racing Team Demo

A demo/proof of concept for Stony Brook Solar Racing's telemetry system


# -- DEPRECATED -- 
Data Analytics app for the Stony Brook Solar Racing Team

## Learning Goals
- Programming in a team
- Documentation
- Git
- Web development
 - HTML
 - CSS
- Backend development

## Design Specifications
- Website Interface
  - User can download all raw data from a specified time range as csv or json (!)
  - User can view data in a specified time range numerically (!)
  - User can view data in a specified time range graphically

- API Endpoint
  - Will receive intermittent requests with new sets of data as csv or json (!)

- Database
  - Store all data in a database (!)

- Additional Features
  - Statistical interpolation/inferencing
  - Pattern detection

Items with exclamations (!) are high priority
All others are long term (i.e. potentially features that can be added next year)

## Data

Sample files for a how received data will be formatted will be stored in sample_data. We do not yet know the types of data that will be required, but creating a simple working product with velocity data formatted as seen in the appropriate file is a good start. It may be to your benefit to create a dummy data generator.

Make sure the code is clean and modular so that incorporating new types of data or modifying existing model classes is easy.
