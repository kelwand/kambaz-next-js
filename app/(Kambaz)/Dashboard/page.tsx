import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <Row xs={1} md={4} className="g-4">
        {/* Course 1 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/1234" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/reactjs.jpg" height={160} />
              <CardBody>
                <CardTitle className="text-nowrap overflow-hidden">
                  CS1234 React JS
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 2 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/1800" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/discrete.webp" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  CS1800 Discrete Structures
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Mathematical Foundation
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 3 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/2500" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/Racket Logo.png" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  CS2500 Fundamentals of Computer Science 1
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Intro to Programming 1
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 4 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/2510" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/java.jpg" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  CS2510 Fundamentals of Computer Science 2
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Intro to Programming 2
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 5 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/3500" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/ood.jpeg" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  CS3500 Object Orient Design
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Object-Oriented Programming
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 6 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/2550" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/security.jpg" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  CY2550 Foundations of CyberSecurity
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Introduction to CyberSecurity
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>

        {/* Course 7 */}
        <Col>
          <Card style={{ width: "270px" }}>
            <Link href="/Courses/3000" className="text-decoration-none text-dark">
              <CardImg variant="top" src="/images/python.png" height={160} />
              <CardBody>
                <CardTitle className="text-wrap overflow-hidden">
                  DS3000 Foundations of Data Science
                </CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  Intro to Data Science
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}