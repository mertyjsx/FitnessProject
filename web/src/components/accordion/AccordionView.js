import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';

class AccordionView extends Component {

	constructor(props) {
		super(props)
		this.state = { activeIndex: 0 }
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index

		this.setState({ activeIndex: newIndex })
	}

	render() {
		const { activeIndex } = this.state
		return (
			<Accordion>
                    { this.props.qa_1 && typeof this.props.qa_1[0] === 'string' && (
                         <div class="col">
                              <Accordion.Title
                                   active={activeIndex === 0}
                                   index={0}
                                   onClick={this.handleClick}
                              >{this.props.qa_1[0]} <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
                              <Accordion.Content active={activeIndex === 0}>
                                   <p>{this.props.qa_1[1]}</p>
                              </Accordion.Content>
                         </div>
                    )}

                    { this.props.qa_2 && typeof this.props.qa_2[0] === 'string' && (
                         <div class="col">
                              <Accordion.Title
                                   active={activeIndex === 1}
                                   index={1}
                                   onClick={this.handleClick}
                              >{this.props.qa_2[0]} <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
                              <Accordion.Content active={activeIndex === 1}>
                                   <p>{this.props.qa_2[1]}</p>
                              </Accordion.Content>
                         </div>
                    )}

                    { this.props.qa_3 && typeof this.props.qa_3[0] === 'string' && (
                         <div class="col">
                              <Accordion.Title
                                   active={activeIndex === 2}
                                   index={2}
                                   onClick={this.handleClick}
                              >{this.props.qa_3[0]} <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
                              <Accordion.Content active={activeIndex === 2}>
                                   <p>{this.props.qa_3[1]}</p>
                              </Accordion.Content>
                         </div>
                    )}

                    { this.props.qa_4 && typeof this.props.qa_4[0] === 'string' && (
                         <div class="col">
                              <Accordion.Title
                                   active={activeIndex === 3}
                                   index={3}
                                   onClick={this.handleClick}
                              >{this.props.qa_4[0]} <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
                              <Accordion.Content active={activeIndex === 3}>
                                   <p>{this.props.qa_4[1]}</p>
                              </Accordion.Content>
                         </div>
                    )}

                    { this.props.qa_5 && typeof this.props.qa_5[0] === 'string' && (
                         <div class="col">
                              <Accordion.Title
                                   active={activeIndex === 4}
                                   index={4}
                                   onClick={this.handleClick}
                              >{this.props.qa_5[0]} <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
                              <Accordion.Content active={activeIndex === 4}>
                                   <p>{this.props.qa_5[1]}</p>
                              </Accordion.Content>
                         </div>
                    )}

               </Accordion>
		)
	}
}

export default AccordionView