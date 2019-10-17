import isRendererProcess from './isRendererProcess';

const isMainProcess: boolean = !isRendererProcess;

export default isMainProcess;
