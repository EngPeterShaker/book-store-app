// Translation keys for English and Arabic
export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    filter: string;
    actions: string;
    yes: string;
    no: string;
    confirm: string;
    back: string;
    next: string;
    submit: string;
    close: string;
  };
  // Navigation
  nav: {
    home: string;
    books: string;
    users: string;
    plans: string;
    events: string;
    followUps: string;
    notifications: string;
    profile: string;
    logout: string;
  };
  // Books
  books: {
    title: string;
    addBook: string;
    editBook: string;
    deleteBook: string;
    bookTitle: string;
    author: string;
    description: string;
    price: string;
    isbn: string;
    publishedDate: string;
    coverImage: string;
  };
  // Users
  users: {
    title: string;
    addUser: string;
    editUser: string;
    name: string;
    email: string;
    role: string;
    status: string;
    active: string;
    inactive: string;
  };
  // Plans
  plans: {
    title: string;
    addPlan: string;
    editPlan: string;
    planName: string;
    planType: string;
    year: string;
    status: string;
    draft: string;
    inProgress: string;
    completed: string;
    leadership: string;
    technical: string;
    performance: string;
    career: string;
  };
  // Events
  events: {
    title: string;
    addEvent: string;
    editEvent: string;
    eventTitle: string;
    eventDate: string;
    location: string;
    status: string;
    pending: string;
    approved: string;
    rejected: string;
    completed: string;
  };
  // Follow-ups
  followUps: {
    title: string;
    addFollowUp: string;
    notes: string;
    nextAction: string;
    dueDate: string;
  };
  // Notifications
  notifications: {
    title: string;
    markAsRead: string;
    noNotifications: string;
  };
  // Forms
  forms: {
    required: string;
    invalidEmail: string;
    passwordTooShort: string;
    passwordsDoNotMatch: string;
  };
}

export const translations: Record<'en' | 'ar', Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      actions: 'Actions',
      yes: 'Yes',
      no: 'No',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      close: 'Close',
    },
    nav: {
      home: 'Home',
      books: 'Books',
      users: 'Users',
      plans: 'Plans',
      events: 'Events',
      followUps: 'Follow-ups',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
    },
    books: {
      title: 'Books',
      addBook: 'Add Book',
      editBook: 'Edit Book',
      deleteBook: 'Delete Book',
      bookTitle: 'Title',
      author: 'Author',
      description: 'Description',
      price: 'Price',
      isbn: 'ISBN',
      publishedDate: 'Published Date',
      coverImage: 'Cover Image',
    },
    users: {
      title: 'Users',
      addUser: 'Add User',
      editUser: 'Edit User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
    },
    plans: {
      title: 'Plans',
      addPlan: 'Add Plan',
      editPlan: 'Edit Plan',
      planName: 'Plan Name',
      planType: 'Plan Type',
      year: 'Year',
      status: 'Status',
      draft: 'Draft',
      inProgress: 'In Progress',
      completed: 'Completed',
      leadership: 'Leadership',
      technical: 'Technical',
      performance: 'Performance',
      career: 'Career',
    },
    events: {
      title: 'Events',
      addEvent: 'Add Event',
      editEvent: 'Edit Event',
      eventTitle: 'Title',
      eventDate: 'Event Date',
      location: 'Location',
      status: 'Status',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      completed: 'Completed',
    },
    followUps: {
      title: 'Follow-ups',
      addFollowUp: 'Add Follow-up',
      notes: 'Notes',
      nextAction: 'Next Action',
      dueDate: 'Due Date',
    },
    notifications: {
      title: 'Notifications',
      markAsRead: 'Mark as Read',
      noNotifications: 'No notifications',
    },
    forms: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordsDoNotMatch: 'Passwords do not match',
    },
  },
  ar: {
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      create: 'إنشاء',
      search: 'بحث',
      filter: 'تصفية',
      actions: 'الإجراءات',
      yes: 'نعم',
      no: 'لا',
      confirm: 'تأكيد',
      back: 'رجوع',
      next: 'التالي',
      submit: 'إرسال',
      close: 'إغلاق',
    },
    nav: {
      home: 'الرئيسية',
      books: 'الكتب',
      users: 'المستخدمون',
      plans: 'الخطط',
      events: 'الأحداث',
      followUps: 'المتابعات',
      notifications: 'الإشعارات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
    },
    books: {
      title: 'الكتب',
      addBook: 'إضافة كتاب',
      editBook: 'تعديل كتاب',
      deleteBook: 'حذف كتاب',
      bookTitle: 'العنوان',
      author: 'المؤلف',
      description: 'الوصف',
      price: 'السعر',
      isbn: 'الرقم الدولي',
      publishedDate: 'تاريخ النشر',
      coverImage: 'صورة الغلاف',
    },
    users: {
      title: 'المستخدمون',
      addUser: 'إضافة مستخدم',
      editUser: 'تعديل مستخدم',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
    },
    plans: {
      title: 'الخطط',
      addPlan: 'إضافة خطة',
      editPlan: 'تعديل خطة',
      planName: 'اسم الخطة',
      planType: 'نوع الخطة',
      year: 'السنة',
      status: 'الحالة',
      draft: 'مسودة',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتملة',
      leadership: 'قيادية',
      technical: 'فنية',
      performance: 'أداء',
      career: 'مهنية',
    },
    events: {
      title: 'الأحداث',
      addEvent: 'إضافة حدث',
      editEvent: 'تعديل حدث',
      eventTitle: 'العنوان',
      eventDate: 'تاريخ الحدث',
      location: 'الموقع',
      status: 'الحالة',
      pending: 'قيد الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      completed: 'مكتمل',
    },
    followUps: {
      title: 'المتابعات',
      addFollowUp: 'إضافة متابعة',
      notes: 'الملاحظات',
      nextAction: 'الإجراء التالي',
      dueDate: 'تاريخ الاستحقاق',
    },
    notifications: {
      title: 'الإشعارات',
      markAsRead: 'تحديد كمقروء',
      noNotifications: 'لا توجد إشعارات',
    },
    forms: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'عنوان البريد الإلكتروني غير صالح',
      passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    },
  },
};

// Helper function to get translation
export const getTranslation = (locale: 'en' | 'ar', key: string): string => {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

// Check if locale is RTL
export const isRTL = (locale: string): boolean => {
  return locale === 'ar';
};

export default translations;
