import AuthContext from 'context/AuthContext';
import { NextPage } from 'next';
import React, { useContext, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';

const RegisterPage: NextPage = () => {
  const { signin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSignin = () => {
    if (form.email && form.password) {
      signin(form.email, form.password);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <label>メールアドレス</label>
                  <Input type="email" name="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>パスワード</label>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </FormGroup>
                <span>
                  <a href="#">
                    <small>パスワードをお忘れですか？</small>
                  </a>
                </span>
                <Button
                  color="primary"
                  style={{ float: 'right', width: 120 }}
                  onClick={handleSignin}
                >
                  登録
                </Button>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            marin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
          }
          .wrapper {
            max-width: 600px;
            margin: 0 auto;
            padding: 10px 30px 20px 30px;
          }
          label {
            padding-bottom: 6px;
          }
        `}
      </style>
    </Container>
  );
};

export default RegisterPage;
