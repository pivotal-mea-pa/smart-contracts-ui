import React, { Component, Fragment } from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Modal,
  Typography
} from '@material-ui/core';
import { Search, History } from '@material-ui/icons';

class Queries extends Component {
  state = {
    open: false,
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };

  onOpen = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dateSorting, statusFilter, filterType, open } = this.state;
    const { queryList } = this.props;
    return (
      <Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.onClose}
        >
          <div className="modal">
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
              odit iure dignissimos voluptates pariatur, temporibus at quod ea
              quidem illum voluptatem, culpa impedit adipisci dolorum
              repellendus nemo! Voluptate voluptatibus excepturi neque
              distinctio ea soluta at odio eveniet eaque laborum earum minima
              doloremque similique, vel harum? Ullam provident eos praesentium
              tempore, ut et! Earum consequatur culpa optio repellendus sunt
              dignissimos sint, nam eum minus deserunt, ea velit, perferendis
              doloremque tenetur quis a sit provident quo suscipit animi
              laudantium. Pariatur laudantium debitis a iusto nisi laborum, ad
              doloremque rerum explicabo unde reprehenderit voluptates
              voluptatibus, impedit nihil ipsam autem magni? Totam, tenetur
              modi.
            </Typography>
          </div>
        </Modal>
        <div className="controls text-right">
          <FormControl className="active-filters-form-control">
            <InputLabel htmlFor="dateSorting">Date</InputLabel>
            <Select
              value={dateSorting}
              onChange={this.onChange}
              inputProps={{
                name: 'dateSorting',
                id: 'dateSorting'
              }}
            >
              <MenuItem value="acending">Acending</MenuItem>
              <MenuItem value="decending">Decending</MenuItem>
            </Select>
          </FormControl>{' '}
          <FormControl className="active-filters-form-control">
            <InputLabel htmlFor="statusFilter">Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={this.onChange}
              inputProps={{
                name: 'statusFilter',
                id: 'statusFilter'
              }}
            >
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="awarded">Awarded</MenuItem>
              <MenuItem value="declined">Declined</MenuItem>
            </Select>
          </FormControl>{' '}
          <FormControl className="active-filters-form-control">
            <InputLabel htmlFor="filterType">A-Z</InputLabel>
            <Select
              value={filterType}
              onChange={this.onChange}
              inputProps={{
                name: 'filterType',
                id: 'filterType'
              }}
            >
              <MenuItem value="a-z">A-Z</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
          <Search className="active-search" />
        </div>
        <div className="card-list">
          <Grid container spacing={8} className="p-3">
            <Grid item sm={2}>
              Name
            </Grid>
            <Grid item sm={2}>
              Vendor
            </Grid>
            <Grid item sm={3}>
              Category
            </Grid>
            <Grid item sm={2}>
              Time
            </Grid>
          </Grid>
          {queryList.map(query => (
            <Card key={query.name} className="p-3 mb-3">
              <Grid container spacing={8}>
                <Grid item sm={2}>
                  {query.name}
                </Grid>
                <Grid item sm={2}>
                  {query.vendor}
                </Grid>
                <Grid item sm={3}>
                  {query.category}
                </Grid>
                <Grid item sm={2} className="text-info">
                  <History /> {query.time}
                </Grid>
                <Grid item sm={3} className="text-right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onOpen}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Queries;
