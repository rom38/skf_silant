import { Button, Text } from "@chakra-ui/react";
import { HStack, Stack, StackDivider, CardFooter } from "@chakra-ui/react";
import { Spinner, Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";


function CardDetail({ fields, data, rowId, setRowId }) {
    return (
        <Card display="inline-flex" bg={(rowId === -1) && "red.200"} borderWidth="2px" borderColor="sil-b">
            <CardHeader bg="sil-b" color="sil-w">
                <Heading size='md'>Случай ТО  </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider borderColor="silant-b.800" />} spacing='1'>
                    {fields.map(field =>
                        <CardRow key={field.key} title={field.title} desc={data[field.key]} />

                    )}
                </Stack>
            </CardBody>
            <CardFooter>
                <Button onClick={() =>
                    setRowId(-1)
                }>
                    Назад
                </Button>
            </CardFooter>
        </Card>
    )
}

function CardRow({ title, desc, ...rest }) {
    return (
        <HStack>
            <Heading size='xs' textTransform='uppercase'>
                {title}
            </Heading>
            <Text fontSize='sm'>
                {desc}
            </Text>
        </HStack>
    )
}

export default CardDetail
