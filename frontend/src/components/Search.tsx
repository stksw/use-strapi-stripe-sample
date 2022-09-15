import React, { useState } from 'react';
import { Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';

type Props = {
  searchWord?: string;
  onChangeWord?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ onChangeWord }: Props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText>検索</InputGroupText>
              <Input placeholder="店舗名、住所など" onChange={onChangeWord} />
            </InputGroup>
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .search {
          margin: 0 0 30px;
          width: 500px;
        }
      `}</style>
    </div>
  );
};

export default Search;
