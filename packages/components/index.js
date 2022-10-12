import Table from "./table";
import PageLoader from './page-loader';
import Dialog from "./dialog";
import Drawer from "./drawer";
import Button from "./button";
import Charts from "./charts";
import Grid, { CvtGridItem } from './grid';
import Form, { CvtFormField } from './form';
import Input from "./Input";
import Selector from "./selector";
import Loading from "./loading";
import Uploader from "./uploader";
import Ratio from "./ratio";
import Step from "./step";
import Check from "./check";
import Detail from "./detail";


export { $dialog } from "./dialog";
export { $drawer } from "./drawer";
export { $message } from "./message";
export { $loading } from "./loading";

export default {
    CvtTable:Table,
    CvtPageLoader: PageLoader,
    CvtDialog: Dialog,
    CvtDrawer: Drawer,
    CvtButton: Button,
    CvtCharts: Charts,
    CvtGrid: Grid,
    CvtGridItem,
    CvtForm: Form,
    CvtFormField,
    CvtInput: Input,
    CvtSelector: Selector,
    CvtLoading: Loading,
    CvtUploader: Uploader,
    CvtRatio: Ratio,
    CvtStep: Step,
    CvtCheck: Check,
    CvtDetail: Detail
}