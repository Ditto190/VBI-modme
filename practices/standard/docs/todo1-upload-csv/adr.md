# ADR-002: CSV Upload and Schema Customization

## Context

The `standard` practice currently uses a hardcoded `demo` connector that fetches a static CSV URL. To support user-provided data, we need a way to upload local CSV files and customize their schema (field names and types) before they are used in the builder.

## Decision

1.  **Local Data Handling**: Introduce a `LocalConnector` (referencing `vbi-react-starter`) that stores data in memory and registers it with `VQuery` using the `json` dataset type.
2.  **CSV Parsing**: Use a robust CSV parser (`parseCsv` utility) to handle quotes, newlines, and BOM.
3.  **UI/UX**:
    - Add an "Upload CSV" button to the top toolbar.
    - Use an Ant Design `Modal` with `Upload.Dragger` for file selection.
    - Implement a two-step process:
      - Step 1: Upload file.
      - Step 2: Customize schema (edit field names and select types: `string`, `number`, `date`, `datetime`, `timestamp`).
4.  **State Management**: Integrate the upload process with `VBIStore` to ensure the builder is re-initialized with the new data source.

## Consequences

- Users can now work with their own data.
- The builder will be reset when a new CSV is uploaded.
