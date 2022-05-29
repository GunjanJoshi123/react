import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import  { Loading } from './LoadingComponent';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
   
class CommentForm extends Component {
   constructor(props) {
      super(props);

     this.state = {
            isComodalOpen: false,
        }
        this.ComodalOpen = this.ComodalOpen.bind(this);
    }
    ComodalOpen() {
        this.setState({
            isComodalOpen: !this.state.isComodalOpen
        });
    }

    handleSubmit(values) {
      //   console.log('Current State is: ' + JSON.stringify(values));
      //   alert('Current State is: ' + JSON.stringify(values));
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment );
    }




render () {
  return (
     <div className='toggle-modal'>
        <Button onClick={this.ComodalOpen} className="grey">
           <span className='fa fa-pencil fa-lg'></span>Submit Comments
        </Button>
        <Modal isOpen={this.state.isComodalOpen} toggle={this.ComodalOpen}>
               <ModalHeader toggle={this.ComodalOpen}>Submit Comment</ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={{size: 12}}>
                           <Control.select model="rating" id="rating" name="rating" placeholder='Rating'
                           className='form-control'>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                           </Control.select>
                        </Col>
                     </Row>
                     <Row className='form-group'>
                                <Label htmlFor='Your Name' md={12}>Your Name</Label>
                                <Col md={{ size: 12 }}>
                                    <Control.text model='.name' id='name' name='name' placeholder='Your Name' className='form-control'
                                     validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 character or less'
                                        }} />

                                </Col>
                            </Row>
                     <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                     </Row>
                     <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                     Submit
                                    </Button>
                                </Col>
                            </Row>
                  </LocalForm>
               </ModalBody>
        </Modal>
     </div>
     
  );
}
}

   function RenderDish({dish}) {
      
      return (
         <div className="col-12 col-5 m-1">
            <Card>
               <CardImg width="100%" src={dish.image} alt={dish.name} />
               <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
               </CardBody>
            </Card>
         </div>
      );
   
      
   }
   
   function RenderComments({comments, addComment, dishId}) {
      if (comments != null) {
         return (
            <div className="col-12 col-5 m-1">
               <h4>Comments</h4>
               <ul className="list-unstyled">
               {comments.map((comment) => {
                  return (
                     <li key={comment.id}>
                       <p>{comment.comment}</p>
                       <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>          
                     </li>
                  );
                })}
                </ul>
                <CommentForm  dishId={dishId} addComment={addComment} />
            </div>
         );
      }
      else {
         return (
            <div></div>
         );
      }
   }
   
   const DishDetail = (props) => {
      if (props.isLoading) {
         return(
            <div className= "container">
               <div className="row">
                  <Loading />
               </div>
            </div>
         );
      }
      else if (props.errMess) {
         return(
            <div className= "container">
               <div className="row">
                  <h4>{props.errMess}</h4>
               </div>
            </div>
         );
      }
      else if (props.dish != null) {
         return (
            <div className="container">
               <div className="row">
                    <Breadcrumb>
                       <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                       <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>    
                    </Breadcrumb>
                    <div className="col-12">
                       <h3>{props.dish.name}</h3>
                       <hr />
                     </div>
               </div>
               <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                     />
                    </div>                 
               </div>
            </div>
         );
      }
      else {
         return (
            <div></div> 
         );
      }
   }


export default DishDetail;