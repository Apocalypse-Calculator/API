import { ItemDefinition as Model } from '~/src/models';
import { ItemDefinition } from '~/src/types';

interface GetAllOptions {
	showDeleted: boolean;
}

export const getAll = async (options: GetAllOptions): Promise<ItemDefinition[]> => {
	const { showDeleted } = options;
	if (showDeleted) {
		return await Model.find();
	}
	return await Model.find({ deleted: false });
};

export const get = async (id: string): Promise<ItemDefinition> => {
	return await Model.findOne({ _id: id, deleted: false });
};

export const getByName = async (name: string): Promise<ItemDefinition> => {
	return await Model.findOne({ name, deleted: false });
};

export const queryByNames = async (names: string[]): Promise<ItemDefinition[]> => {
	return await Model.find({ name: { $in: names } });
};
