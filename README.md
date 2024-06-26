# AI & ML Terms Relationship Visualization

This repository contains data and sample code for visualizing the relationships between terms in the [Artificial Intelligence (AI) & Machine Learning (ML) Dictionary](https://wikidocs.net/book/5942) on Wikidocs.

## File Descriptions

- `graph_data.json`: A JSON file containing AI & ML terms and their relationships.
- `build_graph.py`: A Python script that uses the Wikidocs API to collect term data and generate `graph_data.json`.
- `graph_all.html`: An HTML file that generates a complete graph showing all terms and their relationships.
- `graph_depth2.html`: An HTML file that creates a graph showing relationships up to depth 2 from a selected term.
- `graph_depth2_targetonly.html`: An HTML file that produces a graph showing relationships up to depth 2 from a selected term, but only in the outgoing direction.
- `graph_depth2_interconnect.html`: An HTML file that generates an interactive graph showing all connections up to depth 2 from a selected term.

Each HTML file uses the D3.js library to visualize the graph.

## Usage

1. Run `build_graph.py` to update `graph_data.json` with the latest data.
2. Open the desired HTML file in a web browser to view the graph.
3. The code from `graph_depth2_interconnect.html` is currently being used on the actual Wikidocs site.

This visualization tool allows for easy exploration of the relationships between AI & ML terms.

