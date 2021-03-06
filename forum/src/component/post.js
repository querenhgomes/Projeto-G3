import React from 'react'
import {Card, Button} from 'react-bootstrap'


function Post(props) {
    return (
        <div>
            <br></br>
            <Card style={{ width: '18rem' }}>
  
  <Card.Body>
    <Card.Title>{props.titulo}</Card.Title>
    <Card.Text>
    {props.conteudo}
    </Card.Text>
    <Button variant="primary">{props.btntext}</Button>
  </Card.Body>
</Card>
        </div>
    )
}

export default Post
