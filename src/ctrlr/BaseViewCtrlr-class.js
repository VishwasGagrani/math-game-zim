export default class BaseViewCtrlr {
    constructor() {
        this.zimStage = null;
        this.frame = null;
        this.view_Arr = []; // array of views
        this.viewId_Arr = []; // keys to each view
        this.currentViewId_Str = null;
    }

    modifySettings(pView_arr, pViewId_arr, pFrame) {
        this.frame = pFrame;
        this.zimStage = pFrame.stage;
        this.view_Arr = pView_arr;
        this.viewId_Arr = pViewId_arr;
    }

    addViewAndId(pView, pViewId_str) {
        if (!this.view_Arr) this.view_Arr = [];
        this.view_Arr.push(pView);

        if (!this.viewId_Arr) this.viewId_Arr = [];
        this.viewId_Arr.push(pViewId_str);
    }

    display(pId_str, pView_obj) {
        if (this.currentViewId_Str) {
            const currentView = this.getViewById(this.currentViewId_Str);
            currentView.undisplay(); // remove current view
        }

        this.currentViewId_Str = pId_str;

        const newView = this.getViewById(this.currentViewId_Str);
        newView.display(pView_obj);
    }

    getViewById(pId_str) {
        let view = null;
        for (let i = 0; i < this.view_Arr.length; i++) {
            if (this.viewId_Arr[i] === pId_str) {
                view = this.view_Arr[i];
                break;
            }
        }
        return view;
    }
}

