import React from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import sadman from './images/sad.jpg';

const styles = {
	oopsieStyle : {
		marginTop : "10em",
		background : "rgba(255,255,255,0.5)"
	},
	verticalAlign : {
		display:"inline-block",
		verticalAlign:"middle",
		float:"none"
	},
	verticalAlignCenter : {
		display:"inline-block",
		verticalAlign:"middle",
		float:"none",
		textAlign:"center"
	},
	imgStyle : {
		maxWidth:"15em",
		maxHeight:"15em"
	}
}

class NotFound extends React.Component {

	render() {
		return (
			<Grid>
				<Row>
					<Col lg={12}>
						<Jumbotron style={styles.oopsieStyle}>
							<Row>
								<Col lg={8} style={styles.verticalAlign}>
									<h1>OOPSIE DAISY!</h1>
									<h2> Looks like you made an itty bitty mistake! This page could not be found...</h2>
									<p>
										Try entering a valid link, or go to the main page!
									</p>
								</Col>
								<Col style={styles.verticalAlignCenter} lg={4}>
									<img style={styles.imgStyle} src={sadman}/>
									<h1>404</h1>
								</Col>
							</Row>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default NotFound;
