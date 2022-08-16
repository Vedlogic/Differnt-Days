/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    DateValue: ComponentFramework.PropertyTypes.WholeNumberProperty;
    StartDate: ComponentFramework.PropertyTypes.DateTimeProperty;
    EndDate: ComponentFramework.PropertyTypes.DateTimeProperty;
}
export interface IOutputs {
    DateValue?: number;
    StartDate?: Date;
    EndDate?: Date;
}
