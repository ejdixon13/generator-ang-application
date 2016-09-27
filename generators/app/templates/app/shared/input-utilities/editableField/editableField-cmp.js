function EditableFieldController($scope, $element, $attrs) {
    'ngInject';
    var ctrl = this;
    ctrl.editMode = false;

    ctrl.handleModeChange = function() {
        if (ctrl.editMode) {
            ctrl.onUpdate({value: ctrl.fieldValue});
            ctrl.fieldValueCopy = ctrl.fieldValue;
        }
        ctrl.editMode = !ctrl.editMode;
    };

    ctrl.reset = function() {
        ctrl.fieldValue = ctrl.fieldValueCopy;
    };

    ctrl.$onInit = function() {
        // Make a copy of the initial value to be able to reset it later
        ctrl.fieldValueCopy = ctrl.fieldValue;

        // Set a default fieldType
        if (!ctrl.fieldType) {
            ctrl.fieldType = 'text';
        }
    };
}
export default ()=>
    angular.module('input-utilities')
    .component('editableField', {
        templateUrl: 'app/shared/input-utilities/editableField/editableField-tpl.html',
        controller: EditableFieldController,
        bindings: {
            fieldValue: '<',
            fieldType: '@?',
            onUpdate: '&'
        }
    });
