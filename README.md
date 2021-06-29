# Jnilla Form

JSON based dynamic form generator.

Allows to create dynamic forms that can be edited to add or remove fields on demand. The form data is stored in JSON format for convenience and maleability.

## Installation

Include in your document the following assets:

```
<link href="../assets/css/styles.css" rel="stylesheet" type="text/css" />
<script src="../assets/js/script.js"></script>
```

## Basic Usage

To create a form on ```Live Mode``` use this followin syntax:

```
<textarea class="jnilla-form">{JSON data here}</textarea>
```

To create a form on ```Edit Mode``` use this followin syntax:

```
<textarea class="jnilla-form jnilla-form-edit">{JSON data here}</textarea>
```

## How it Works

The ```textarea``` will be hide with CSS and below it the new form will be generated.

The ```textarea``` holds the form data in JSON format and it will be updated dynamically with any change on the generated form.

If the provided JSON data is invalid some default data will be used instead.

The form may not work correctly on the presence of duplicated ```id``` attributes.

Make sure your form fields are not using the same ```id``` attribute as any other HTML element in the document. 

## Example

Download the repository and check the example folder to see the form in action.

## License

This project is under the MIT License.