import {
	toggleLeftNav,
	setDeleteEntity,
	defaultDeleteEntity,
} from '../store/ui-state/ui-stateSlice';
import { useDispatch } from 'react-redux';

export const DeleteEntity = (type, id, name) => {
	const dispatch = useDispatch();
	if (type === 'student') {
		dispatch(setDeleteEntity({ type, id }));
	}
};
