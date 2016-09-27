
<%= readmedescription %>

## Requirements

- AngularJS

## Usage


You can get it from [Bower](http://bower.io/)

```sh
bower install <%= ngapp %>
```

Load the script files in your application:

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/<%= ngapp %>/dist/<%= ngapp %>.min.js"></script>
```

Add the specific module to your dependencies:

```javascript
angular.module('myApp', ['<%= ngapp %>', ...])
```

Example Usage:
```

```