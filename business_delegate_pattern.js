class EJBService {
	constructor() {}
	
	doProcessing() {
		console.log('Processing task by invoking EJB service');
	}
}

class JMSService {
	constructor() {}
	
	doProcessing() {
		console.log('Processing task by invoking JMS service');
	}
}

class BusinessLookUp {
	constructor() {}
	
	getBusinessService(serviceType) {
		if(serviceType == 'EJB') {
			return new EJBService();
		} else {
			return new JMSService();
		}
	}
}

class BusinessDelegate {
	constructor() {
		this.businessLookUp = new BusinessLookUp();
		this.serviceType;
	}
	
	setServiceType(serviceType) {
		this.serviceType = serviceType;
	}
	
	doTask() {
		const businessLookUp = this.businessLookUp.getBusinessService(this.serviceType);
		businessLookUp.doProcessing();
	}
}

class Client {
	constructor(businessDelegate) {
		this.businessDelegate = businessDelegate;
	}
	
	doTask() {
		this.businessDelegate.doTask();
	}
}

const businessDelegate = new BusinessDelegate();
businessDelegate.setServiceType('EJB');

const client = new Client(businessDelegate);
client.doTask();

businessDelegate.setServiceType('JMS');
client.doTask();