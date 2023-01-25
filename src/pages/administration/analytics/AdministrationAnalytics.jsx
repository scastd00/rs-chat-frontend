import React from 'react';
import { Button, Container, CssBaseline, Grid, Link } from '@mui/material';

function AdministrationAnalytics() {
  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Link
            href={`http://${import.meta.env.VITE_PROD_HOST}:4046/d/spring_boot_rs_chat_full_monitor/spring-boot-full-system-monitor?orgId=1`}
            target='_blank'
            rel='noreferrer'
            underline='none'
          >
            <Button variant='outlined' fullWidth color='primary'>
              Go to Prometheus
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link
            href={`http://${import.meta.env.VITE_PROD_HOST}:4046/d/xlmnQ_h4z/logs?orgId=1`}
            target='_blank'
            rel='noreferrer'
            underline='none'
          >
            <Button variant='outlined' fullWidth color='primary'>
              Go to Loki
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdministrationAnalytics;
