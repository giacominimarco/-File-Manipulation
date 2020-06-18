import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UploadForm() {
  return (
    <Row>
      <Col>
        <Form action="http://localhost:3001/upload" method="POST" encType="multipart/form-data">
          <Form.Group>
            <Form.File id="attachment" name="attachment" label="Anexo" />

          </Form.Group>
          <Button type="submit">Enviar</Button>
        </Form>
      </Col>
    </Row>
  );
}
export default UploadForm;