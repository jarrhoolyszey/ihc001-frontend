import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
} from '@material-ui/core';

import theme from 'themes/theme';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    marginBottom: '20px',
    
    '& .category-title': {
      width: '100%',
      color: theme.palette.primaryText,
      textAlign: 'center',
      backgroundColor: theme.palette.primaryLight,
    },
    
    '& ul': {
      padding: '0px 30px',
    }
  }
});


const CategoryCard = (props) => {
  const css = useStyles();

  const { title, items } = props.category;
  
  return (
    <Paper className={css.root} elevation={3}>
      <Typography variant={'subtitle1'} className="category-title">{title}</Typography>
      <ul>
      {
        items.map((item, index) => (
          <li key={`${index}`}>{item}</li>
        ))
      }
      </ul>
    </Paper>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string),
  })
}

export default CategoryCard;