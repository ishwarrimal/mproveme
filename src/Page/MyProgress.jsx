import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable, Card, useTheme, TextInput } from 'react-native-paper';
import { getMyPlans } from '../Modal/planModal';

const hourlyInterval = 1;
const overallTime = [6,10];
const keyId = '14-3-2022';
totalItems = (12-overallTime[0]+overallTime[1])/hourlyInterval;

const DataTableExample = () => {
  const [sortAscending, setSortAscending] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [item, setItem] = React.useState([]);

  React.useEffect(() => {
    // setItem(constructData());
    const today = new Date();
    getMyPlans(today).then(p => {
      setItem(p.tasks)
    }).catch(e => alert(e));
  },[])
  
  const {
    colors: { background },
  } = useTheme();

  const sortedItems = item
    .slice()
    .sort((item1, item2) =>
      (sortAscending
      ? item1.id < item2.id
      : item2.id < item1.id)
        ? 1
        : -1
    );
//   const itemsPerPage = 2;
//   const from = page * itemsPerPage;
//   const to = (page + 1) * itemsPerPage;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
    >
      <Card>
          {item.length > 0 && 
                <DataTable>
                <DataTable.Header>
                    <DataTable.Title
                    sortDirection={sortAscending ? 'ascending' : 'descending'}
                    onPress={() => setSortAscending(!sortAscending)}
                    >
                    Hourly Breakup
                    </DataTable.Title>
                    <DataTable.Title numeric style={styles.input}>Ideal</DataTable.Title>
                    <DataTable.Title numeric style={styles.input}>Actual</DataTable.Title>
                </DataTable.Header>

                {sortedItems.map(item => (
                    <DataTable.Row key={item.id}>
                    <DataTable.Cell >{item.hour}</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.input}>
                    <TextInput
                        style={styles.inputStyle}
                        dense
                        placeholder="Ideal"
                        value={item.ideal}
                        onChangeText={()=>{}}
                    />
                </DataTable.Cell>
                    <DataTable.Cell numeric style={styles.input}>
                    <TextInput
                        style={styles.inputStyle}
                        dense
                        placeholder="Actual"
                        value={item.actual}
                        onChangeText={()=>{}}
                    />
                    </DataTable.Cell>
                    </DataTable.Row>
                ))}

                {/* <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.floor(sortedItems.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${sortedItems.length}`}
                /> */}
                </DataTable>
        }
      </Card>
    </ScrollView>
  );
};

DataTableExample.title = 'Data Table';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40
  },

  content: {
    padding: 8,
  },

  input: {
    flex: 2,
  },
  inputStyle: {
      width: 100,
  }
});

export default DataTableExample;
