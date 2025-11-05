// DashboardScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import {
  Card,
  Title,
  DataTable,
  Button,
  Divider,
  Avatar,
  Badge,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome Adnan Ali</Text>
        <Button mode="contained" style={styles.addBtn}>
          Add Targets
        </Button>
      </View>

      <View style={styles.row}>
        {/* TOP 10 Lead SOURCES */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>TOP 10 Lead SOURCES (124516)</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>#</DataTable.Title>
                <DataTable.Title>Source</DataTable.Title>
                <DataTable.Title numeric>Count</DataTable.Title>
              </DataTable.Header>

              {[
                { rank: 1, source: 'Broker', count: 107463 },
                { rank: 2, source: 'Facebook', count: 14338 },
                { rank: 3, source: 'Incoming Call', count: 783 },
                { rank: 4, source: 'Facebook page enquiry', count: 683 },
                { rank: 5, source: 'RealStateShop', count: 462 },
                { rank: 6, source: 'OnlinePropertyPoint', count: 311 },
                { rank: 7, source: 'Expo', count: 252 },
                { rank: 8, source: 'Personal', count: 113 },
              ].map(item => (
                <DataTable.Row key={item.rank}>
                  <DataTable.Cell>{item.rank}</DataTable.Cell>
                  <DataTable.Cell>{item.source}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.count.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* TODAY'S Leads */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>TODAY'S Leads (2)</Title>
            <View style={styles.todayRow}>
              <Text style={styles.todayLabel}>OnlinePropertyPoint</Text>
              <Badge style={styles.badge}>2</Badge>
            </View>
          </Card.Content>
        </Card>

        {/* TOP Lead Owners */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>TOP Lead Owners (124513)</Title>
            <DataTable>
              {[
                { name: 'Samad Khan', leads: 27415 },
                { name: 'Noor Aftab', leads: 18811 },
                { name: 'Narmeen Iqbal', leads: 14861 },
                { name: 'Sammar Abbas', leads: 14771 },
                { name: 'Qamar Farid', leads: 13416 },
                { name: 'M Saquib Ur Rehman', leads: 12399 },
                { name: 'Ernest Samuel', leads: 6994 },
                { name: 'Mannan Arif', leads: 6345 },
              ].map((owner, idx) => (
                <DataTable.Row key={idx}>
                  <DataTable.Cell>{owner.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {owner.leads.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* TOP Lead Brokers */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>TOP Lead Brokers (107443)</Title>
            <DataTable>
              {[
                { broker: 'Agent Hafiz Hamza (Hafiz Hamza)', count: 1 },
                { broker: 'HAMZA AGENT (Hafiz Hamza)', count: 252 },
                { broker: 'Alpha Saq (M Saquib Ur Rehman)', count: 1118 },
                { broker: 'Beta Agent (M Saquib Ur Rehman)', count: 213 },
                { broker: 'mahnooragent (Mahanoor Chaudhry)', count: 157 },
                { broker: 'nomanhaslinedata (Noman hashmi)', count: 2487 },
                { broker: 'Syed Nouman Agent (Noman hashmi)', count: 4003 },
                { broker: 'Syed Noman HFX (Noman hashmi)', count: 658 },
              ].map((b, idx) => (
                <DataTable.Row key={idx}>
                  <DataTable.Cell>{b.broker}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {b.count.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </View>

      <Divider style={styles.divider} />

      {/* Bottom Row */}
      <View style={styles.row}>
        {/* Total Over Due */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Total Over Due (1048)</Title>
            <DataTable>
              {[
                { name: 'Abdul Wahab', due: 28 },
                { name: 'Sammar Abbas', due: 14741 },
                { name: 'M Saquib Ur Rehman', due: 8333 },
                { name: 'Qamar Farid', due: 10384 },
                { name: 'Saad Khan', due: 17 },
                { name: 'Noor Aftab', due: 18670 },
                { name: 'Samad Khan', due: 19353 },
                { name: 'Fahim Aftab', due: 908 },
              ].map((d, i) => (
                <DataTable.Row key={i}>
                  <DataTable.Cell>{d.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {d.due.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Total Lead */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Total Lead (124505)</Title>
            <Button mode="outlined" style={styles.selectBtn}>
              Select User
            </Button>
            <View style={styles.statRow}>
              <Text>Assigned to User</Text>
              <Text style={styles.statValue}>88,980</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Attempted to Contact</Text>
              <Text style={styles.statValue}>12,807</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Contact in Future</Text>
              <Text style={styles.statValue}>690</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Duplicated Leads</Text>
              <Text style={styles.statValue}>15</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Junk Lead</Text>
              <Text style={styles.statValue}>3,007</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Lost Lead</Text>
              <Text style={styles.statValue}>17,286</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Low Budget</Text>
              <Text style={styles.statValue}>90</Text>
            </View>
          </Card.Content>
        </Card>

        {/* External Lead */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>External Lead (107443)</Title>
            <Button mode="outlined" style={styles.selectBtn}>
              Select User
            </Button>
            <View style={styles.statRow}>
              <Text>Assigned to User</Text>
              <Text style={styles.statValue}>79,899</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Attempted to Contact</Text>
              <Text style={styles.statValue}>8,810</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Contact in Future</Text>
              <Text style={styles.statValue}>422</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Duplicated Leads</Text>
              <Text style={styles.statValue}>6</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Junk Lead</Text>
              <Text style={styles.statValue}>2,726</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Lost Lead</Text>
              <Text style={styles.statValue}>15,069</Text>
            </View>
            <View style={styles.statRow}>
              <Text>Meeting Confirmed</Text>
              <Text style={styles.statValue}>90</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Today Created Leads */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Today Created Leads</Title>
            {/* Placeholder – you can put a chart or list here */}
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Chart / List</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Current Month Pipeline</Text>
        <View style={styles.targetRow}>
          <Text>Quarterly Target Remaining Days</Text>
          <Text style={styles.targetDays}>428</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '35%' }]} />
          </View>
          <Text style={styles.progressLabel}>Target</Text>
          <Text style={styles.progressLabel}>Achieved</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/* -------------------------------------------------
   Styles
   ------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  welcome: { fontSize: 18, fontWeight: '600' },
  addBtn: { backgroundColor: '#007AFF' },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  card: {
    width: width > 600 ? '48%' : '100%',
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  todayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayLabel: { fontWeight: '500' },
  badge: { backgroundColor: '#4CAF50', color: '#fff' },

  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 12 },

  selectBtn: { marginBottom: 12 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statValue: { fontWeight: '600' },

  placeholder: { height: 120, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#999' },

  footer: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  footerTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  targetDays: { fontWeight: '600' },
  progressContainer: { width: '100%', alignItems: 'center' },
  progressBar: {
    width: '80%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressFill: { height: '100%', backgroundColor: '#4CAF50' },
  progressLabel: { marginTop: 4, fontSize: 12, color: '#666' },
});
