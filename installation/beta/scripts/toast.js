toast(android.provider.Settings.System.getString(context.getContentResolver(), 'bluetooth_name'))
toast(android.provider.Settings.Secure.getString(context.getContentResolver(), 'bluetooth_name'))
toast(android.provider.Settings.System.getString(context.getContentResolver(), 'device_name'))
toast(android.provider.Settings.Secure.getString(context.getContentResolver(), 'lock_screen_owner_info'))