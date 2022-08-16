import { EncodeIntoResult } from "util";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DiffrenceInDays implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    //PCF Elements
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChangedU: () => void;
    private container: HTMLDivElement;

    //My Html Elements
    private dayDifferenceInputBox: HTMLElement;

    //Two Value i'll Get
    private startDate: Date
    private endDate: Date


    //Two Value i'll Get
    private startDateU: Date
    private endDateU: Date

    //Event Listenr To Buttons
    private pcfOnloadEvent: EventListenerOrEventListenerObject;
    private diffTime: number

    private remainingProjectDays: number
    private projectDuration: number

    constructor() {

    }


    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        // alert("Init Called");
        debugger
        this.context = context;
        this.notifyOutputChangedU = notifyOutputChanged;
        this.container = container;

        this.dayDifferenceInputBox = document.createElement("input");
        this.dayDifferenceInputBox.setAttribute("type", "text");
        this.dayDifferenceInputBox.setAttribute("id", "dayDiffrence");

        //Get Two Dates

        //@ts-ignore
        var startDateLogicalName = context.parameters.StartDate.attributes.LogicalName;
        //@ts-ignore
        var endDateLogicalName = context.parameters.EndDate.attributes.LogicalName;

        //@ts-ignore
        this.startDate = window.parent.Xrm.Page.getAttribute(startDateLogicalName).getValue();
        //@ts-ignore
        this.endDate = window.parent.Xrm.Page.getAttribute(endDateLogicalName).getValue();

        let today = new Date();
        let currentYear = new Date().getFullYear();
        let beginOfYear = new Date(currentYear, 0, 1); //01-JAN-CURRENT_YEAR
        let endOfYear = new Date(currentYear, 11, 31); //31-DEC-CURRENT_YEAR


        if (this.endDate >= today) {
            if (this.endDate <= endOfYear) {
                this.remainingProjectDays = differenceInDays(today, this.endDate);
                // @ts-ignore
                this.dayDifferenceInputBox.value = this.remainingProjectDays;
            } else {
                this.remainingProjectDays = differenceInDays(today, endOfYear);
                // @ts-ignore
                this.dayDifferenceInputBox.value = this.remainingProjectDays;
            }
        }






        this.dayDifferenceInputBox.setAttribute("class", "")
        // this.dayDifferenceInputBox.setAttribute("value", "test");
        // this.dayDifferenceInputBox.setAttribute("title", "test");
        this.dayDifferenceInputBox.setAttribute("maxlength", "100");
        this.dayDifferenceInputBox.setAttribute("readonly", "true");
        this.dayDifferenceInputBox.style.padding = '6px';
        this.container.appendChild(this.dayDifferenceInputBox);

    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        // alert("Update");
        debugger

        //@ts-ignore
        var startDateLogicalNameUpdate = context.parameters.StartDate.attributes.LogicalName;
        //@ts-ignore
        var endDateLogicalNameUpdate = context.parameters.EndDate.attributes.LogicalName;
        //@ts-ignore
        this.startDateU = window.parent.Xrm.Page.getAttribute(startDateLogicalNameUpdate).getValue();
        //@ts-ignore
        this.endDateU = window.parent.Xrm.Page.getAttribute(endDateLogicalNameUpdate).getValue();
        let today = new Date();
        let currentYear = new Date().getFullYear();
        let beginOfYear = new Date(currentYear, 0, 1); //01-JAN-CURRENT_YEAR
        let endOfYear = new Date(currentYear, 11, 31); //31-DEC-CURRENT_YEAR

        if (this.endDateU < today) {
            //@ts-ignore
            this.dayDifferenceInputBox.value = 0;
        }
        else {
            if (this.endDateU <= endOfYear) {
                this.projectDuration = differenceInDays(today, this.endDateU)
                //@ts-ignore
                this.dayDifferenceInputBox.value = this.projectDuration;
            }
            else {
                this.projectDuration = differenceInDays(today, endOfYear);
                //@ts-ignore                
                this.dayDifferenceInputBox.value = this.projectDuration;
            }
        }

    }

    public getOutputs(): IOutputs {
        return {
            //@ts-ignore
            DateValue: this.dayDifferenceInputBox.value
        };
    }
    public destroy(): void {
        // Add code to cleanup control if neces sary
    }
}

function differenceInDays(date1: Date, date2: Date) {


    const diffTime = Math.abs(date2.valueOf() - date1.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}