import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange, toggleSortOrder }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true}  id="fa-search" size="21px" title="Поиск"/>
			<Icon className="sort-icon" inactive={true} id="fa-sort" title="Сортировка" size="21px" onClick={toggleSortOrder} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	height: 20px;
	margin: 10px 3px 0 3px;
	margin-bottom: 20px;

	& > input {
		padding: 10px 32px 10px 10px;
	    background: transparent;
		border-radius: 5px;
	}

	& > div {
		position: absolute;
		top: 4px;
		right: 38px;
	}

	& .sort-icon {
		cursor: pointer;
		position: absolute;
		top: 4px;
		right: 12px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
