import { React, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardImg,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

export default function Photo(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Card>
        <CardImg top width='100%' src={props.image} alt='..' onClick={toggle} />
        <CardBody>
          <CardText>
            <div className='titlesize'>
              <div className='title'>
                <b> {props.title}</b>
              </div>
            </div>
          </CardText>
        </CardBody>
      </Card>

      <div>
        {" "}
        <Modal
          backdrop={false}
          fullscreen
          size='md'
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>
            <b>Full Image</b>{" "}
          </ModalHeader>
          <ModalBody>
            <img
              src={props.fullimage}
              alt='<Spinner>
  Loading...
</Spinner>'
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={toggle}>
              Do Something
            </Button>{" "}
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
