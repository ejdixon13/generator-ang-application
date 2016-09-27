import del from 'del';
import config from './config';

export default ()=>del([config.get('buildRoot')]);
