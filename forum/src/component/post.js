import React from 'react'
import { Card, Button, Accordion } from 'react-bootstrap'


function Post(props) {
  return (

    <div>
      <br></br>
      {/* 
            <Card>
              <Card.Header>
                  <Card.Title>{props.titulo}</Card.Title>
              </Card.Header>
                <Card.Text>
                    {props.conteudo}
                </Card.Text>
              <Button variant="primary">{props.btntext}</Button>
            </Card>
          */}

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {props.resumo + " " + props.key + " " + props.gender}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{props.conteudo + " " + props.gender + " " + props.key + " " + props.btntext}</Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>

    </div>
  )
}

export default Post
