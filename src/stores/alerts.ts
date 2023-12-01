import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AlertType, type AppAlert } from '@/utils/app_types';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<AppAlert[]>([]);

  function alert(msg: string) {
    alerts.value.push({ type: AlertType.Neutral, message: msg });
  }

  function errorAlert(msg: string) {
    alerts.value.push({ type: AlertType.Error, message: msg });
  }

  function successAlert(msg: string) {
    alerts.value.push({ type: AlertType.Success, message: msg });
  }

  function warningAlert(msg: string) {
    alerts.value.push({ type: AlertType.Warning, message: msg });
  }

  function infoAlert(msg: string) {
    alerts.value.push({ type: AlertType.Info, message: msg });
  }

  function deleteAlert(index: number) {
    alerts.value.splice(index, 1);
  }

  return { alerts, alert, errorAlert, successAlert, warningAlert, infoAlert, deleteAlert } as const;
})
