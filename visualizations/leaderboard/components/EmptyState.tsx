import React from "react";
import {
  Card,
  CardBody,
  HeadingText,
  CardSection,
  CardSectionBody,
  CardSectionHeader,
  List,
  ListItem,
} from "nr1";

export const EmptyState: React.FC = () => (
  <Card className="EmptyState">
    <CardBody className="EmptyState-cardBody">
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        Please provide NRQL query that returns data in the correct format.
      </HeadingText>
      <CardSection className="EmptyState-cardSection">
        <CardSectionHeader>
          <HeadingText type={HeadingText.TYPE.HEADING_4}>
            The query should include the columns (as required):
          </HeadingText>
        </CardSectionHeader>
        <CardSectionBody>
          <List fullWidth={true} rowHeight={20}>
            <ListItem>
              • <code className="inline">example prop</code> - description of
              example prop
            </ListItem>
          </List>
        </CardSectionBody>
      </CardSection>
      <CardSection className="EmptyState-cardSection">
        <CardSectionHeader>
          <HeadingText type={HeadingText.TYPE.HEADING_4}>Example:</HeadingText>
        </CardSectionHeader>
        <CardSectionBody>
          <code>FROM ... SELECT ...</code>
        </CardSectionBody>
      </CardSection>
    </CardBody>
  </Card>
);
