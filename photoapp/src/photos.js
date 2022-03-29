import { React, useEffect, useState } from "react";
import axios from "axios";
import Photo from "./photo";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import {
  Container,
  Row,
  Button,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export default function Photos() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [startingPage, setStartingPage] = useState(1);
  const pageNumbersPerPage = 10;
  const [endingPage, setEndingPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [presentPage, setpresentPage] = useState(1);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/1/photos`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  const getPage = (start, end) => {
    const numsArray = [];
    for (let i = start; i <= end; i += 1) {
      if (i <= 100) {
        numsArray.push(i);
      }
    }
    setPages(numsArray);
  };
  const previousOne = () => {
    setStartingPage(startingPage - pageNumbersPerPage);
    setEndingPage(endingPage - pageNumbersPerPage);
    getPage(startingPage - pageNumbersPerPage, endingPage - pageNumbersPerPage);
  };
  const nextOne = () => {
    setStartingPage(startingPage + pageNumbersPerPage);
    setEndingPage(endingPage + pageNumbersPerPage);
    getPage(startingPage + pageNumbersPerPage, endingPage + pageNumbersPerPage);
  };
  const changePage = (page) => {
    if (page <= 100 && page >= 1) {
      setpresentPage(page);
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/${page}/photos`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(page);
    }
  };

  console.log(data[0]);
  console.log(data);
  return (
    <div className=' container-fluid'>
      <div>
        <h1 className='Bin'>Photos App</h1>
        <div className='pagination'>
          <Pagination size='md'>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={previousOne}
                disabled={startingPage === 1}
              />
            </PaginationItem>
            {pages.map((page) => (
              <PaginationItem active={page === presentPage}>
                <PaginationLink
                  onClick={() => {
                    changePage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                next
                onClick={nextOne}
                disabled={endingPage >= 100}
              />
            </PaginationItem>
          </Pagination>
        </div>

        <div className='text-center'>
          <Button
            className='rounded-circle  '
            onClick={() => {
              changePage(presentPage - 1);
            }}
          >
            <ArrowLeft />
          </Button>
          <b>Album ID: {presentPage}</b>
          <Button
            className='rounded-circle'
            onClick={() => {
              changePage(presentPage + 1);
            }}
          >
            <ArrowRight />
          </Button>
        </div>
        {loading ? (
          <div className='text-center'>
            <h4>Loading...</h4>
            <Spinner type='grow' color='primary' />
            <Spinner type='grow' color='secondary' />
            <Spinner type='grow' color='warning' />
            <Spinner type='grow' color='danger' />{" "}
          </div>
        ) : (
          <div>
            {data.map((val) => {
              return (
                <div>
                  <Container>
                    <div className='box'>
                      <Row>
                        <Photo
                          title={val.title}
                          image={val.thumbnailUrl}
                          fullimage={val.url}
                        />
                      </Row>
                    </div>
                  </Container>
                </div>
              );
            })}
          </div>
        )}

        <br />
        <div></div>
      </div>
    </div>
  );
}
