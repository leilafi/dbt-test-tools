<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Dbt Tools" />

  &#xa0;

  <!-- <a href="https://dbttools.netlify.app">Demo</a> -->
</div>

<h1 align="center">Dbt Tools</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/{{YOUR_GITHUB_USERNAME}}/dbt-tools?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Dbt Tools 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="https://github.com/{{YOUR_GITHUB_USERNAME}}" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

This is a tool to generate Elementary tests for data sources. Input of the tool is a Snowflake table description and output of the tool is a series of Elementary schema, freshness and volume anomaly tests.

## :sparkles: Features ##

:heavy_check_mark: Saves time on adding Elementary tests for Snowflake tables;\

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [Elementary](https://docs.elementary-data.com/introduction)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/leilafi/dbt-tools

# Access
$ cd dbt-tools

# Install dependencies
$ npm i

Create a table.sql under DBT-TOOLS

Copy the description of the table which you want to generate tests for from Snowflake to table.sql

# Generate tests
$ node schema-test-generator.js



```



Made with :heart: by <a href="https://github.com/leilafi/">Leila Firouz</a>

&#xa0;

<a href="#top">Back to top</a>
