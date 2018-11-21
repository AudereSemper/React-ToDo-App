import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { List } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';


import TextField from '@material-ui/core/TextField';






const styles = {
  root: {
    flexGrow: 1,
  },
  grid: {
    margin: 12
  },
  detailsDescription: {
    paddingTop: 24
  }
};


class App extends Component {
  constructor() {
    super()

    this.state = {
      todos:[
        {title:'ToDo n1', description:"description of todo 1"},
        {title:'ToDo n2', description:"description of todo 2"},
        {title:'ToDo n3', description:"description of todo 3"},
      ],
      
      selectedIdx: -1,
      adding: false,
      form: {
        title: '',
        description: '',
      }

    }
  }

  todoListItemOnClick(event, index) {
    this.setState({
      todos:[...this.state.todos],
      selectedIdx: index,
      adding: this.state.adding,
      form: {
        title:'',
        description: '',
      }
    });
  }

  newTodoOnClick(event) {
    this.setState({
      todos:[...this.state.todos],
      selectedIdx: this.state.selectedIdx,
      adding: true,
      form: {
        title:'',
        description: '',
      }
    });
  }

  newTodoSave(event) {
    this.setState({
      todos:[...this.state.todos, this.state.form],
      selectedIdx: this.state.selectedIdx,
      adding: false,
      form: {
        title:'',
        description: '',
      }
    });
  }

  newTodoCancel(event) {
    this.setState({
      todos:[...this.state.todos],
      selectedIdx: this.state.selectedIdx,
      adding: false,
      form: {
        title:'',
        description: '',
      }
    });
  }

  onTitleChange(characterAdded) {
    this.setState({
      todos:[...this.state.todos],
      selectedIdx: this.state.selectedIdx,
      adding: this.state.adding,
      form: {
        title: characterAdded.target.value,
        description: this.state.form.description,
      }
    });
  }

  onDescriptionChange(characterAdded) {
    this.setState({
      todos:[...this.state.todos],
      selectedIdx: this.state.selectedIdx,
      adding: this.state.adding,
      form: {
        title: this.state.form.title,
        description: characterAdded.target.value,
      }
    });
  }

  deleteNote(event, index) {
    this.setState({
      todos:this.state.todos.filter((todo, idx) => idx !== index),
      selectedIdx: this.state.selectedIdx,
      adding: this.state.adding,
      form: {
        title: this.state.form.title,
        description: this.state.form.description,
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { todos, selectedIdx, adding } = this.state;
    
    const renderedTodos = todos.map((todo, index) =>(
      <ListItem key={index} button onClick={event => this.todoListItemOnClick(event, index)}>
        <ListItemText primary={todo.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={event =>this.deleteNote(event, index)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    let selectedTodoDetails = '';

    if(selectedIdx >= 0) {
      const selectedTodo = todos[selectedIdx];
      selectedTodoDetails= (
      <Fragment>
        <Typography variant="h4">{selectedTodo.title}</Typography>
        <Divider />
        <Typography variant="body1" component="p" className={classes.detailsDescription}>{selectedTodo.description}</Typography>
      </Fragment>);
    }else {
      selectedTodoDetails = 
      <Fragment>
        <Typography variant="body1" component="p">Select an element from the list to show relative details</Typography>
      </Fragment> 
    }

    let addTodoUI = ''

    if(adding) {
      addTodoUI= 
      <form>
         <TextField
          onChange={event => this.onTitleChange(event)}
          label="Title"
          placeholder="Just do it!"
          multiline
          margin="normal"
          fullWidth
        />
        <TextField
          onChange={event => this.onDescriptionChange(event)}
          label="Description"
          placeholder="Just do it!"
          multiline
          margin="normal"
          fullWidth
        />
        <Button color="secondary" onClick={(event) => this.newTodoSave(event)}>
          Save <SaveIcon></SaveIcon>
        </Button>

        <Button color="default" onClick={(event) => this.newTodoCancel(event)}>
          Delete <SaveIcon></SaveIcon>
        </Button>
      </form>
    } else {
      addTodoUI = ( 
        <Button color="secondary" onClick={(event) => this.newTodoOnClick(event)}>
          New ToDo
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Todo App
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={8} className={classes.grid}>
          <Grid item xs={4}>
            <Paper>
              <Typography variant="h4">Lists of Todo</Typography>
              <Divider />
              {addTodoUI}
              <List>{renderedTodos}</List> 
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              {selectedTodoDetails}
            </Paper>
          </Grid>
        </Grid>  
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
